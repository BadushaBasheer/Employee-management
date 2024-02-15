package com.demorest.usermanagement.util;

import java.util.logging.Logger;
import java.io.IOException;

import com.demorest.usermanagement.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        logger.info("req " + request);
        logger.info("RTH " + requestTokenHeader);

        String userName = null;
        String jwtToken = null;
        logger.info("request  " + request);
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {

            jwtToken = requestTokenHeader.substring(7);
            try {
                userName = this.jwtUtils.extractUsername(jwtToken);
            } catch (ExpiredJwtException e) {
                logger.warning("Jwt token expired");
            } catch (Exception e) {
                logger.severe("Error occurred: " + e.getMessage());
            }
        } else {
            logger.warning("Invalid token, not starting with Bearer");
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                final UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(userName);

                if (this.jwtUtils.validateToken(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            } catch (UsernameNotFoundException e) {
                logger.warning("User not found: " + userName);
            }
        } else {
            logger.warning("Token is not valid");
        }
        filterChain.doFilter(request, response);
    }
}
