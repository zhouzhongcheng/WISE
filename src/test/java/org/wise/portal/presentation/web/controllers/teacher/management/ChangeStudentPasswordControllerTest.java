/**
 * Copyright (c) 2007 Regents of the University of California (Regents). Created
 * by TELS, Graduate School of Education, University of California at Berkeley.
 *
 * This software is distributed under the GNU Lesser General Public License, v2.
 *
 * Permission is hereby granted, without written agreement and without license
 * or royalty fees, to use, copy, modify, and distribute this software and its
 * documentation for any purpose, provided that the above copyright notice and
 * the following two paragraphs appear in all copies of this software.
 *
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE. THE SOFTWAREAND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED
 * HEREUNDER IS PROVIDED "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE
 * MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 *
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
 * SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
 * REGENTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package org.wise.portal.presentation.web.controllers.teacher.management;

import static org.easymock.EasyMock.createMock;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;

import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.AbstractModelAndViewTests;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import org.wise.portal.domain.authentication.impl.ChangeStudentPasswordParameters;
import org.wise.portal.domain.user.User;
import org.wise.portal.domain.user.impl.UserImpl;
import org.wise.portal.service.user.UserService;

/**
 * @author patricklawler
 * $Id:$
 */
public class ChangeStudentPasswordControllerTest extends AbstractModelAndViewTests{
	
	private static final String PASSWORD = "a";
	
	private static final String SUCCESS = "SUCCESS VIEW";

	private static final String FORM = "FORM VIEW";
	
	private static final String STUDENT_NAME = "z";

	private ChangeUserPasswordController changeStudentPasswordController;
	
	private ChangeStudentPasswordParameters changeStudentPasswordParameters;
	
	private UserService mockUserService;
	
	private ApplicationContext mockApplicationContext;
	
	private MockHttpServletRequest request;

	private MockHttpServletResponse response;
	
	private HttpSession mockSession;
	
	private BindingResult errors;
	
	private SessionStatus status;
	
	private User user;
	
	private User studentUser;
	
	public Object mockObject;

	/**
	 * @throws Exception 
	 * @see junit.framework.TestCase#setUp()
	 */
	@SuppressWarnings("unchecked")
	protected void setUp() throws Exception {
		super.setUp();
		mockApplicationContext = createMock(ApplicationContext.class);
		request = new MockHttpServletRequest();
		response = new MockHttpServletResponse();
		studentUser = new UserImpl();
		changeStudentPasswordParameters = new ChangeStudentPasswordParameters();
		changeStudentPasswordParameters.setPasswd1(PASSWORD);
		changeStudentPasswordParameters.setPasswd2(PASSWORD);
		changeStudentPasswordParameters.setUser(studentUser);
		errors = new BindException(changeStudentPasswordParameters, "");

		mockSession = new MockHttpSession();
		mockSession.setAttribute(User.CURRENT_USER_SESSION_KEY, this.user);
		this.request.setSession(mockSession);
		
		this.mockUserService = createMock(UserService.class);
		changeStudentPasswordController = new ChangeUserPasswordController();
	}
	
	public void testOnSubmit_success() throws Exception {
		// test submission of form with correct password info.
		// should get ModelAndView back containing Success view

		expect(mockUserService.updateUserPassword(studentUser, PASSWORD)).andReturn(user);
		replay(mockUserService);
		
		String view = changeStudentPasswordController.onSubmit(changeStudentPasswordParameters, errors, status);
		assertEquals(SUCCESS, view);
		assertTrue(!errors.hasErrors());
		verify(mockUserService);
	}

	
	@Override
	protected void tearDown() throws Exception {
		super.tearDown();
		request = null;
		response = null;
	}	

}
